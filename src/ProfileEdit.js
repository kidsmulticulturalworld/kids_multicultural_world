import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import DashboardNav from './DashboardNav'
import Collapse from 'react-bootstrap/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { kidsDetailsAction, updateAction } from './Action';
import Loader from './Loader';
import DelModal from './DelModal';
import { HANDLE_EDIT_RESET, KIDS_DETAILS_RESET, USER_LOGOUT } from './Constant';
import Loader2 from './Loader2';
import IsEmpty from './IsEmpty';
import Toasts from './Toasts';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const history = useNavigate()
    const dispatch= useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const kidsDetails = useSelector(state => state.kidsDetails)
    const {loading,error,kid} = kidsDetails

    const [kiddi, setKiddo] = useState([]);
    // const [kiddo, setKiddoo] = useState([]);
    // const [talentso, setTalentso] = useState([]);

    let {fb,instagram:insta,website,linkedin,youtube,imdb:imd} = kiddi
    
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    
    const [modalShow, setModalShow] = useState(false);
    const [availId, setAvailId] = useState(-1);
    const [linkz, setLinkz] = useState();

    const [fullname, setFullname] = useState(userInfo ? userInfo.first_name : "");
    const [lastname, setLastname] = useState(userInfo ? userInfo.last_name : "");
    const [gender, setGender] = useState(kid ? kid.gender : "");
    const [eyeColor, setEyeColor] = useState(kid ? kid.eye_color : "");
    const [hairColor, setHairColor] = useState(kid ? kid.hair_color : "");
    const [height, setHeight] = useState(kid ? kid.height : "");
    const [weight, setWeight] = useState(kid ? kid.weight : "");
    const [dress, setDress] = useState(kid ? kid.dress_size : "");
    const [age, setAge] = useState(kid ? kid.age : "");
    const [ethnicity, setEthnicity] = useState(kid ? kid.ethnicity : "");
    const [faceBook, setFaceBook] = useState(kiddi.fb);
    const [instagram, setInstagram] = useState("");
    const [imdb, setImdb] = useState("");
    const [youTube, setYouTube] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [talentss, setTalentss] = useState("");

    const [profiles, setProfiles] = useState("");
    const [kind, setkind] = useState(false);
    const [otherImages, setOtherImages] = useState("");
    const [video, setVideo] = useState("");
    
    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/profile-edit`)
        }
    },[userInfo])

    useEffect(()=>{
        setFaceBook(fb)
        setInstagram(insta)
        setImdb(imd)
        setYouTube(youtube)
        setPortfolio(website)
        setLinkedIn(linkedin)
    },[fb,insta,website,linkedin,youtube,imd])
    useEffect(()=>{
        if (kid && !IsEmpty(kid) && kid.social_media){
            const kidos = `${kid.social_media}`.split("[***]")
            let emptyObj ={}
            kidos.map(x => {
                const m = x.split("[**]")
                emptyObj[`${m[1]}`]=m[0]
                return null;
            })
            setKiddo(emptyObj)
            // setKiddoo(emptyObj)
            const talento = `${kid.talents}`.split("[***]")
            // setTalentso(talento)
            setTalentss(talento.join(","))

        }
        
    },[kid])
    const inputRef = React.useRef()
    const imgRef = React.useRef()
    
    const delImg = useSelector(state => state.delImg)
    const {success} = delImg
    
    const updateUser = useSelector(state => state.updateUser)
    const {error:err,success:successs,loading:load} = updateUser

    useEffect(()=>{
        if(userInfo){
            dispatch({type: KIDS_DETAILS_RESET})
            dispatch(kidsDetailsAction(userInfo.p_id))
        }
    },[userInfo,success,successs])

    useEffect(()=>{
        if((userInfo && kid) && (userInfo.id !== kid.user.id) ){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }
    },[kid])
    
    const convertVideo = x =>{
        let m = x.split(".com/watch?v=")
        if (m.length > 1){
            return m[1]
        }else{
            m = x.split(".com/shorts/")
            let mm = x.split(".com/embed/")
            let mmm = x.split("youtu.be/")
            if (m.length > 1){
                return m[1]
            }else if (mm.length > 1){
                let mx = mm[1].split('" title')
                return mx[0]
            }else if (mmm.length > 1){
                return mmm[1]
            }else{
                return false
            }
        }
    }

    const handleSubmitName = ()=>{
        if (fullname && lastname){
            dispatch({
                type: HANDLE_EDIT_RESET,
            })
            dispatch(updateAction({
                type : "name",
                fullname,
                lastname
            }))
        }
    }
    const saveProfHandler = () =>{
        let form_data = new FormData();
        form_data.append('type', "profilePix")
        form_data.append('profiles', profiles)
        dispatch({
            type: HANDLE_EDIT_RESET,
        })
        dispatch(updateAction(form_data))
        form_data = new FormData()
        setProfiles("")
    }
    useEffect(()=>{
        if (profiles && profiles !== ""){
            saveProfHandler()
        }
    },[profiles])
    const saveOtherPixHandler = () =>{
        let form_data = new FormData();
        form_data.append('type', "otherPix")
        form_data.append('otherPix', otherImages)
        dispatch({
            type: HANDLE_EDIT_RESET,
        })
        dispatch(updateAction(form_data))
        form_data = new FormData()
        setOtherImages("")
    }
    useEffect(()=>{
        if (otherImages && otherImages !== ""){
            saveOtherPixHandler()
        }
    },[otherImages])
    
   
    const handleSubmitAppearance = ()=>{
        if (gender || eyeColor || hairColor || height ||
            weight || dress || age || ethnicity){
            dispatch({
                type: HANDLE_EDIT_RESET,
            })
            dispatch(updateAction({
                type : "apperance",
                gender,
                eyeColor,
                hairColor,
                height,
                weight,
                dress,
                age,
                ethnicity
            }))
        }
    }

    const submitSocial = ()=>{
        if (faceBook || instagram || imdb || youTube ||
            portfolio || linkedIn){
            dispatch({
                type: HANDLE_EDIT_RESET,
            })
            dispatch(updateAction({
                type : "social",
                social : `${faceBook ? faceBook + "[**]fb[***]" : ""}${instagram ? instagram + "[**]instagram[***]" : ""}${imdb ? imdb + "[**]imdb[***]" : ""}${youTube ? youTube + "[**]youtube[***]" : ""}${portfolio ? portfolio + "[**]website[***]" : ""}${linkedIn ? linkedIn + "[**]linkedin" : ""}`
            }))
        }
    }
    const submitTalents = ()=>{
        if (talentss){
            dispatch({
                type: HANDLE_EDIT_RESET,
            })
            dispatch(updateAction({
                type : "talents",
                talent : (talentss.split(",")).join("[***]")
            }))
        }
    }
    const submitVideos = ()=>{
        if (video && video !== ""){
            dispatch({
                type: HANDLE_EDIT_RESET,
            })
            dispatch(updateAction({
                type : "videos",
                video
            }))
            setVideo("")
        }
    }
    const [show, setShow] = useState(false);
    const [toastMessage, settoastMessage] = useState("");
    const [toastVariant, settoastVariant] = useState("");

    useEffect(()=>{
        if(error || err){
            setkind("unsuccessful!")
            settoastMessage("An Error Occurred")
            setShow(true)
            settoastVariant("danger")
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error, err])
    useEffect(()=>{
        if(kid && kid.user.last_name){
            setLastname(kid.user.last_name)
        }
        if(kid && kid.user.first_name){
            setFullname(kid.user.first_name)
        }
    },[kid])
    return (
        <div>
            <div>
                <SideBar />
            </div>
            <Toasts 
                onClose={() => setShow(false)}
                show={show}
                toastMessage = {toastMessage}
                toastVariant = {toastVariant}
            />
            <div className='pt_1'></div>
            <div className='mainContent shadow'>
                <DashboardNav />
                <div className='mainContentDashboardsubs'>
                    {loading && <Loader />}
                    <div className="profileEditContainerXr">
                        <div>
                            <div className='font_16 bold8 blue'>
                                {kid && kid.user.last_name} {kid && kid.user.first_name}
                            </div>
                            <div className="grided3">
                                <div>
                                    <span className='font_18 bold7 pt_2 d-block'>
                                        First name
                                    </span>
                                    <div>
                                        <input type="text" placeholder='First name'
                                            value={fullname} 
                                            onChange={(e)=>setFullname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className='font_18 bold7 pt_2 d-block'>
                                        Last name
                                    </span>
                                    <div>
                                        <input type="text" placeholder='Last name'
                                            value={lastname} 
                                            onChange={(e)=>setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {load ? 
                                <div className='mt_2'>
                                    <button className="inputFormBtn">
                                        <Loader2 variant={"light"} />
                                    </button>
                                </div>
                            :
                                <div className='mt_2'>
                                    <button className="inputFormBtn"
                                        onClick={()=>{
                                            setOpen(false)
                                            setOpen2(false)
                                            setOpen3(false)
                                            setOpen4(false)
                                            setOpen5(false)
                                            handleSubmitName()
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            }
                            
                        </div>
                        <div
                            onClick={() =>{
                                setOpen(!open)
                                setOpen2(false)
                                setOpen3(false)
                                setOpen4(false)
                                setOpen5(false)
                            }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className='pt_2'
                        >
                            <span className='font_18 bold7 pt_2 d-block pointer'>
                                Appearance
                            </span>
                        </div>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <div className="grided3 pt_2">
                                    <div>
                                        <div className='font_12 bold8'>
                                            Gender
                                        </div>
                                        <select 
                                            value={gender} 
                                            onChange={(e)=>setGender(e.target.value)}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Eye Color
                                        </div>
                                        <input type="text" placeholder='Eye color' 
                                            value={eyeColor} 
                                            onChange={(e)=>setEyeColor(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Hair Color
                                        </div>
                                        <input type="text" placeholder='Hair color' 
                                            value={hairColor} 
                                            onChange={(e)=>setHairColor(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Height (inches)
                                        </div>
                                        <input type="number" placeholder='Height (inches)' 
                                            value={height} 
                                            onChange={(e)=>setHeight(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Weight (lbs)
                                        </div>
                                        <input type="number" placeholder='Weight (lbs)' 
                                            value={weight} 
                                            onChange={(e)=>setWeight(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Dress size
                                        </div>
                                        <input type="text" placeholder='Dress size' 
                                            value={dress} 
                                            onChange={(e)=>setDress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Age
                                        </div>
                                        <input type="text" placeholder='Age' 
                                            value={age} 
                                            onChange={(e)=>setAge(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className='font_12 bold8'>
                                            Ethnicity
                                        </div>
                                        <input type="text" placeholder='Ethnicity' 
                                            value={ethnicity} 
                                            onChange={(e)=>setEthnicity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {load ? 
                                    <div className='mt_2'>
                                        <button className="inputFormBtn">
                                            <Loader2 variant={"light"} />
                                        </button>
                                    </div>
                                :
                                    <div className='mt_2'>
                                        <button className="inputFormBtn"
                                            onClick={handleSubmitAppearance}
                                        >
                                            Save
                                        </button>
                                    </div>
                                }
                            </div>
                        </Collapse>
                        <div
                            onClick={() => {
                                setOpen(false)
                                setOpen2(!open2)
                                setOpen3(false)
                                setOpen4(false)
                                setOpen5(false)
                            }}
                            aria-controls="example-collapse-text2"
                            aria-expanded={open2}
                            className='pt_2'
                        >
                            <span className='font_18 bold7 pt_2 d-block pointer'>
                                Social Media
                            </span>
                        </div>
                        <Collapse in={open2}>
                            <div id="example-collapse-text">
                                <div className='grided3'>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Facebook
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Facebook profile link' 
                                            value={faceBook} 
                                            onChange={(e)=>{
                                                setFaceBook(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Instagram
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Instagram link'
                                            value={instagram} 
                                            onChange={(e)=>setInstagram(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            IMDb
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='IMDb link'
                                            value={imdb} 
                                            onChange={(e)=>setImdb(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Youtube
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Youtube profile link'
                                            value={youTube} 
                                            onChange={(e)=>setYouTube(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Portfolio
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Portfolio link'
                                            value={portfolio} 
                                            onChange={(e)=>setPortfolio(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            LinkedIn
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='LinkedIn link'
                                            value={linkedIn} 
                                            onChange={(e)=>setLinkedIn(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='mt_2'>
                                    {load ? 
                                        <button className="inputFormBtn">
                                            <Loader2 variant={"light"} />
                                        </button>
                                    :
                                        <button className="inputFormBtn" onClick={submitSocial}>
                                            Save
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => {
                                setOpen(false)
                                setOpen2(false)
                                setOpen3(!open3)
                                setOpen4(false)
                                setOpen5(false)
                            }}
                            aria-controls="example-collapse-text2"
                            aria-expanded={open3}
                            className='pt_2'
                        >
                            <span className='font_18 bold7 pt_2 d-block pointer'>
                                Talent
                            </span>
                        </div>
                        <Collapse in={open3}>
                            <div id="example-collapse-text">
                                <div className='grided33'>
                                    <span>
                                        Enter talents (saparated with a comma)
                                    </span>
                                    <textarea placeholder='Singing,dancing,skating' cols="30" rows="3"
                                        value={talentss} 
                                        onChange={(e)=>setTalentss(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='mt_2'>
                                    {load ? 
                                        <button className="inputFormBtn">
                                            <Loader2 variant={"light"} />
                                        </button>
                                    :
                                        <button className="inputFormBtn" onClick={submitTalents}>
                                            Save
                                        </button>
                                    }
                                </div>
                            </div>
                        </Collapse>
                        <div
                            onClick={() => {
                                setOpen(false)
                                setOpen2(false)
                                setOpen3(false)
                                setOpen4(!open4)
                                setOpen5(false)
                            }}
                            aria-controls="example-collapse-text2"
                            aria-expanded={open4}
                            className='pt_2'
                        >
                            <span className='font_18 bold7 pt_2 d-block pointer'>
                                Photos
                            </span>
                        </div>
                        <Collapse in={open4}>
                            <div id="example-collapse-text" className='pb_4'>
                                <span className="bold7 font_12">
                                    Change profile picture
                                </span>
                                <div className='pt_2'>
                                    <input
                                        type="file"
                                        ref={inputRef}
                                        accept='image/*'
                                        multiple = {false}
                                        className='d_none'
                                        // value={""}
                                        onChange={(e)=>{
                                            if (e.target.files.length > 0){
                                                setProfiles(e.target.files[0])
                                            }
                                        }}
                                    />
                                    {(load && open4) ? 
                                        <button disabled={true} className='inputFormBtn'>
                                            <Loader2 />
                                        </button>
                                    :
                                        <button 
                                            className="inputFormBtn pointer" 
                                            onClick={() => inputRef.current.click()}
                                        >
                                            Change profile image
                                        </button>
                                    }
                                    <div className='pt_4 tenderProfileImg'>
                                        {kid &&
                                            <img className='center_imager' src={kid.profile_photo ? `${kid.profile_photo}` : (kid.gender === "male" ? "/Images/male_avatar.png" : "/Images/female_avatar.png")} alt={kid.name} />
                                        }
                                    </div>
                                </div>
                                <div className="pt_5 bold7 font_18">
                                    Other pictures
                                </div>

                                <input
                                    type="file"
                                    ref={imgRef}
                                    multiple = {false}
                                    // value={""}
                                    accept='image/*'
                                    className='d_none'
                                    onChange={(e)=>{
                                        if (e.target.files.length > 0){
                                            setOtherImages(e.target.files[0])
                                        }
                                        
                                    }}
                                />

                                <div className='pt_2'>
                                    {(load && open4) ? 
                                        <button 
                                            className="inputFormBtn" 
                                        >
                                            <Loader2 variant={"light"} />
                                        </button>
                                    :
                                        <button 
                                            className="inputFormBtn" 
                                            onClick={() => imgRef.current.click()}
                                        >
                                            Add image
                                        </button>
                                    }
                                </div>
                                {kid && kid.other_images && 
                                    <div className="mt_4 border-top">
                                        <div className="pt_3">
                                            <div className="profilePhotosContainer">
                                                {kid.other_images.map(x=>(
                                                    <div key={x.id}>
                                                        <img keyr={x.id} key={x.id} className='h-100 center_imager' src={`${x.image}`} alt={kid.name} />
                                                        <div className='delEditImg'>
                                                            <button 
                                                                className='bg-danger'
                                                                onClick={() => {
                                                                    setAvailId(x.id)
                                                                    setModalShow(true)
                                                                    setLinkz("del_other_images")
                                                                    setkind(false)
                                                                    
                                                                }}
                                                            >Delete</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Collapse>
                        <div
                            onClick={() => {
                                setOpen(false)
                                setOpen2(false)
                                setOpen3(false)
                                setOpen4(false)
                                setOpen5(!open5)
                            }}
                            aria-controls="example-collapse-text2"
                            aria-expanded={open5}
                            className='pt_2'
                        >
                            <span className='font_18 bold7 pt_2 d-block pointer'>
                                Videos
                            </span>
                        </div>
                        <Collapse in={open5}>
                            <div id="example-collapse-text">
                                <span className="bold7 font_12">
                                    Change Video
                                </span>
                                <div className='pt_2'>
                                    <div className="youtubeInputContainer shadow-lg">
                                        <input
                                            type="text"
                                            value={video} 
                                            onChange={(e)=>setVideo(e.target.value)}
                                            placeholder='Input Youtube video link'
                                        />
                                        {(load && open5)?
                                            <button>
                                                <Loader2 variant={"light"} />
                                            </button>
                                        :
                                            <button onClick={submitVideos}>
                                                Add Video
                                            </button>
                                        }
                                    </div>
                                    <div className="profileVideoContainer">
                                        {kid && kid.video.map((x,keee)=>{
                                            if (convertVideo(x.video)){
                                                return (
                                                    <div key={keee}>

                                                        <button className='removeVideo bg-danger'
                                                            onClick={()=>{
                                                                setAvailId(x.id)
                                                                setModalShow(true)
                                                                setLinkz("del_Video")
                                                                setkind("video")
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${convertVideo(x.video)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                    </div>
                                                )
                                            }
                                            return null
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        
                    </div>
                </div>
            </div>
            <DelModal
                ids= {availId}
                show={modalShow}
                linkk={linkz}
                Kind={kind}
                onHide={() =>setModalShow(false)}
                
            />
        </div>
    )
}

export default ProfileEdit