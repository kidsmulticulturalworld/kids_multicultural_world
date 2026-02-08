import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import ImageUploader from './components/ImageUploader'
import { useNavigate } from 'react-router-dom'
import prices from "./PricesOfSubscription"
import { useDispatch } from 'react-redux'
import { CHECKOUT_SUCCESS } from './Constant'
import axios from 'axios'

const Casting = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "",
        parent_name: "",
        eye_color: "",
        hair_color: "",
        age: "",
        dress_size: "",
        race: "",
        height: "",
        experience: "",
        city: "",
        chicago: false,
        los_angeles: false,
        houston_tx: false,
        las_vegas: false,
        new_york: false,
    })

    const [image,setImage]= useState(null)
    const [loading,setLoading]= useState(false)
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(false)
        setError2(false)
        const { chicago, los_angeles, houston_tx, las_vegas, new_york } = formData;
        if (!chicago && !los_angeles && !houston_tx && !las_vegas && !new_york) {
            setError(true)
            return;
        }
        if (!image) {
            setError2(true)
            return;
        }
        setLoading(true)

        // Starts here

        const formDatas = new FormData();
        formDatas.append('image', image);
        
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/checkout`,
            {
                action_performed:"casting",
                data: formData,
                link:"casting",
                type: "casting"
            },
        )
        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: data
        })
        
        
        console.log(data)
        formDatas.append('secrete', data.clientSecret);
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/save_cast_img`,
            formDatas,
            { headers }
        )
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            data:formData,action_performed : "casting",id:response.data.id
        }))
        setLoading(false)
        
        history(`/checkout/casting/casting`)
    };
    const isReg = true
    return (
        <div>
            <Navbar />
            {/* <Carousel images={images} /> */}
            <img src="/Images/Casting/usaKids.jpg" className='w-full' />
            <div className='standard_width_sm'>
                <div className="pt_5">
                    <div className="fonts2 font_32 ">
                        <i className='blue'>The Audition</i>
                    </div>
                </div>
                <p className="pt_2">
                    We believe every child talents deserved to be highlighted . Our goal is to unite a diverse Nation of kids globally. Taking Kids Talent to the next level through Unity Fashion Shows, Magazine features, Modeling , Acting Classes and Mentorship sections for Kids ages 0 to 17 years old. 
                </p>
                <p className="pt_2">
                    We look forward to meeting all models who will be auditioning for Kids Multicultural World.
                </p>
                <p className="pt_2">
                    Requirements:
                </p>
                <ol className="pt_2" start={1} >
                    <li>
                        <span className='bold6'>Age:</span> Children between the ages of 0months to 17 years old are welcome to apply.
                    </li>
                    <li>
                        <span className='bold6'>Appearance:</span> There is no specific height, size, or race that’s a requirement, as we do not discriminate and we are looking for children of all shapes and sizes. 
                    </li>
                    <li>
                        <span className='bold6'>Experience:</span> Prior modeling experience is not required. We welcome children from all backgrounds. 
                    </li>
                </ol>
                <div className="pt_2">
                    What to expect after registration:​
                    
                </div>
                <p className='pt_2'>
                    Once application is submitted, you will be prompted to fulfill and pay a non refundable registration fee ({process.env.REACT_APP_CURRENCY_SYMBOL}{prices["casting"]}). 
                </p>
                <p>
                    An email will be sent out to confirm your  registration & orientation details if accepted.
                </p>
                <div className="mt_8">
                    <div className="fonts2 font_32 center ">
                        {isReg ?
                            <i className='blue'>Model Registration</i>
                        :
                            <i className='red'>Registration closed</i>
                        }
                    </div>
                </div>
                {isReg && 
                    <div className="mt_5 rounded shadow-lg p-5">
                        <form onSubmit={handleSubmit} className='gap_form'>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>First Name *</label>
                                    <input 
                                        required type="text" 
                                        className="form-control" placeholder="First name" 
                                        value={formData.first_name}
                                        onChange={(e)=>setFormData({...formData, first_name:e.target.value})}
                                        />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Last Name *</label>
                                    <input 
                                        required 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Last name" 
                                        value={formData.last_name}
                                        onChange={(e)=>setFormData({...formData, last_name:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Email *</label>
                                    <input required type="text" className="form-control" placeholder="Email"
                                        value={formData.email}
                                        onChange={(e)=>setFormData({...formData, email:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Phone *</label>
                                    <input type="text" className="form-control" placeholder="Phone" 
                                        value={formData.phone}
                                        required
                                        onChange={(e)=>setFormData({...formData, phone:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Gender *</label>
                                    <input type="text" className="form-control" placeholder="Gender" 
                                        value={formData.gender}
                                        required
                                        onChange={(e)=>setFormData({...formData, gender:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Parents name *</label>
                                    <input type="text" className="form-control" placeholder="Parents name" 
                                        value={formData.parent_name}
                                        required
                                        onChange={(e)=>setFormData({...formData, parent_name:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Eye Colour</label>
                                    <input type="text" className="form-control" placeholder="Eye Colour" 
                                        value={formData.eye_color}
                                        onChange={(e)=>setFormData({...formData, eye_color:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Hair Colour</label>
                                    <input type="text" className="form-control" placeholder="Hair Colour" 
                                        value={formData.hair_color}
                                        onChange={(e)=>setFormData({...formData, hair_color:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Age</label>
                                    <input type="text" className="form-control" placeholder="Age" 
                                        value={formData.age}
                                        onChange={(e)=>setFormData({...formData, age:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Dress Size</label>
                                    <input type="text" className="form-control" placeholder="Dress Size" 
                                        value={formData.dress_size}
                                        onChange={(e)=>setFormData({...formData, dress_size:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Race/Ethnicity</label>
                                    <input type="text" className="form-control" placeholder="Race/Ethnicity" 
                                        value={formData.race}
                                        onChange={(e)=>setFormData({...formData, race:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Height(Feet / Inches)</label>
                                    <input type="text" className="form-control" placeholder="Height(Feet / Inches)" 
                                        value={formData.height}
                                        onChange={(e)=>setFormData({...formData, height:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>Years of Runway Experience</label>
                                    <input type="text" className="form-control" placeholder="Years of Runway Experience" 
                                        value={formData.experience}
                                        onChange={(e)=>setFormData({...formData, experience:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md mt-3 mt-md-0">
                                    <label className='pl-1 pb-1'>City / State of Residence</label>
                                    <input type="text" className="form-control" placeholder="City / State of Residence" 
                                        value={formData.city}
                                        onChange={(e)=>setFormData({...formData, city:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={`mt_4 bold5 ${error && "red"}`}>
                                Which of the following shows are you applying? *
                            </div>
                            <div className="form-group mt-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" 
                                        value={formData.chicago}
                                        onChange={(e)=>setFormData({...formData, chicago:e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Chicago
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" 
                                        value={formData.los_angeles}
                                        onChange={(e)=>setFormData({...formData, los_angeles:e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Los Angeles
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" 
                                        value={formData.houston_tx}
                                        onChange={(e)=>setFormData({...formData, houston_tx:e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Houston Tx
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" 
                                        value={formData.las_vegas}
                                        onChange={(e)=>setFormData({...formData, las_vegas:e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Las Vegas NV
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" 
                                        value={formData.new_york}
                                        onChange={(e)=>setFormData({...formData, new_york:e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        New York
                                    </label>
                                </div>
                            </div>
                            <div className="mt-3">
                                <ImageUploader setImg={setImage} />
                                {error2 && (
                                    <p className='mt-2 text-danger center'>*Please upload a photograph</p>
                                )}
                            </div>
                            <p className='mt_2 center'>
                                <i>Registration fee required. Click Continue to proceed to payment window. Kids Multicultural World LLC maintains a strict no-refund policy on registration fees</i>
                            </p>

                            <p className="flex">
                                <button type='submit' disabled={loading} className='btn_secondarys_main'>
                                    {loading ? 'Loading...' : "Continue"}
                                </button>
                            </p>
                        </form>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Casting