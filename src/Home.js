import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer'
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { newsLetterAction } from './Action';
import Message from './Message';
import Loader2 from './Loader2';

const Home = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const history = useNavigate()
    const ref = useRef(null)
    const [height, setHeight] = useState(199)
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()
    const [newsEmail, setNewsEmail] = useState("")
    const newsLetter = useSelector(state => state.newsLetter)
    const { loading, error: errors, success } = newsLetter

    // useEffect(() => {
    //     try{
    //         document.onreadystatechange = () => {
    //             setHeight(ref.current.clientHeight ? ref.current.clientHeight : 199) 
    //         };
    //     }catch{}
    // }, []);

    const submitHandler = () => {
        if (!newsEmail) {

        } else {
            dispatch(newsLetterAction({ newsEmail }))
        }
    }

    const [errorsHandler, setErrorsHandler] = useState("")
    useEffect(() => {
        if (loading) {
            setErrorsHandler("")
        } else if (errors) {
            setErrorsHandler("An error occoured")
        } else if (success) {
            setErrorsHandler("Success!")
        } else {
            setErrorsHandler("")
        }
    }, [loading, errors, success, dispatch]);

    const Search = () => {
        const mySearch = {
            Events: "/events",
            Hoodie: "/hoodies-n-shirts",
            Shirts: "/hoodies-n-shirts",
            Bonnets: "/hair-bonnets",
            Magazine: "/magazines",
            Mentorship: "/classes",
            Contests: "/contests"
        }
        if (search) {
            history(mySearch[search])
        }
    }
    return (
        <div>
            <Navbar />
            <div className='standard_width homeBased'>
                <div className="pt_5">
                    <div className="center">
                        <span className="blue fonts2 font_34 bold4">
                            Kids
                        </span>
                        <span className="red pl_05 fonts2 font_34 bold4">
                            Multicultural
                        </span>
                        <span className='blue fonts2 font_34 bold4 pl_05'>
                            World
                        </span>
                    </div>
                    <div className="center pt_1 taking">
                        Kids Multicultural World Academy develops children ages 0–17 into confident leaders and responsible global citizens through structured talent
                         development, cultural education, international fashion festivals, media platforms, and mentorship {userInfo ? <Link to={"/profile"} className='text-primary'>View my profile.</Link> :
                            <span>Join now - <Link to={"/sign-up"} className='text-primary'> Create your profile.</Link></span>
                        }
                    </div>
                    {/* <div className='py_3'>
                        <div className="search_container shadow_sm">
                            
                            <select
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            >
                                <option value="">Search</option>
                                <option value="Contests">Contest</option>
                                <option value="Events">Events</option>
                                <option value="Hoodie">Hoodie</option>
                                <option value="Bonnets">Hair bonnets</option>
                                <option value="Magazine">Magazine</option>
                                <option value="Mentorship">Mentorship</option>
                                <option value="Shirts">Shirts</option>
                            </select>
                            <span onClick={Search}>
                                <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/24/ffffff/external-search-interface-essentials-kmg-design-glyph-kmg-design.png" alt='Icon' />
                            </span>
                        </div>
                    </div> */}
                </div>
                {/* <div className="py_4">
                    <div className="standard_in">
                        <div className="flex ">
                            <span className='pr_1 smd'>
                                All 
                            </span>
                            <Link to={"/contests"}>
                                <span className='smx'>
                                    Contest
                                </span>
                            </Link>
                            <Link to={"/shop"}>
                                <span className='smx'>
                                    Shop 
                                </span>
                            </Link>
                            <Link to={"/magazines"}>
                                <span className='smx'>
                                    Magazines
                                </span>
                            </Link>
                            <Link to={"/classes"}>
                                <span className='smx'>
                                    Classes
                                </span>
                            </Link>
                            <Link to={"/events"}>
                                <span className='smx'>
                                    Events
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="standard_in">
                        <div className="py_4 carodisplay">
                            <Carousel>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className='botBorder mb_1' ref={ref}>
                                                <img src="/Images/WhatsApp Image 2023-02-26 at 00.44.07.jpeg" alt="Kids World" />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/college.jpeg" alt=" kids World" />
                                                </div>
                                                <img src="/Images/WhatsApp Image 2023-02-26 at 00.44.10 (10).jpeg" className='imgThres' alt="Kids World" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/WhatsApp Image 2023-03-06 at 11.49.55.jpeg" alt="Kids" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className='botBorder mb_1'>
                                                <img src="/Images/colleges.jpeg" alt="Kids world" 
                                                    style={{
                                                        height : `${height}px`
                                                    }} 
                                                />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/Web BR2.jpg" alt="Kids world" />
                                                </div>
                                                <img src="/Images/Web BR3.jpg" className='imgThres' alt="Kids world" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/magCovers.jpeg" alt="Kids world" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className='botBorder mb_1'>
                                                <img src="/Images/Web TR1.jpg" alt="kids world"
                                                    style={{
                                                        height : `${height}px`
                                                    }} 
                                                />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/Web BR1.jpg" alt="Kids world" />
                                                </div>
                                                <img src="/Images/Web BR3.jpg" className='imgThres' alt="Kids World" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/cover.jpeg" alt="Magazine" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="py_4 carodisplay2">
                            <Carousel>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        
                                        <div>
                                            <div className='botBorder mb_1' ref={ref}>
                                                <img src="/Images/WhatsApp Image 2023-02-26 at 00.44.07.jpeg" alt="Kids" />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/college.jpeg" alt="Kids" />
                                                </div>
                                                <img src="/Images/WhatsApp Image 2023-02-26 at 00.44.10 (10).jpeg" className='imgThres' alt="Kids" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/WhatsApp Image 2023-03-06 at 11.49.55.jpeg" alt="Magazine" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        
                                        <div>
                                            <div className='botBorder mb_1'>
                                                <img src="/Images/colleges.jpeg" alt="Kids multicultural" 
                                                    style={{
                                                        height : `${height}px`
                                                    }} 
                                                />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/Web BR2.jpg" alt="Kids multicultural" />
                                                </div>
                                                <img src="/Images/Web BR3.jpg" className='imgThres' alt="Kids multicultural " />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/magCovers.jpeg" alt="Kids multicultural" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        
                                        <div>
                                            <div className='botBorder mb_1'>
                                                <img src="/Images/Web TR1.jpg" alt="Kids multicultural"
                                                    style={{
                                                        height : `${height}px`
                                                    }} 
                                                />
                                            </div>
                                            <div className="inside_id2">
                                                <div className='thres'>
                                                    <img src="/Images/Web BR1.jpg" alt="Kids multicultural" />
                                                </div>
                                                <img src="/Images/Web BR3.jpg" className='imgThres' alt="Kids multicultural" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/cover.jpeg" alt="Kids multicultural" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>


                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className="inside_id">
                                                <Link to={"/hoodies-n-shirts"}>
                                                    <img src="/Images/blackHoodies.jpeg" alt="Hoodie" />
                                                </Link>
                                                <Link to={"/hoodies-n-shirts"}>
                                                    <img src="/Images/whiteHoodie.jpeg" className='borrad' alt="Hoodies and Shirts" />
                                                </Link>
                                            </div>
                                            <div className='botBorder mt_1'>
                                                <img src="/Images/Shirts.jpeg" alt="Kids multicultural" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/WhatsApp Image 2023-03-06 at 11.49.55.jpeg" alt="Kids multicultural" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className="inside_id">
                                                <img src="/Images/blackHoodies.jpeg" alt="Kids multicultural" />
                                                <img src="/Images/Shirts.jpeg" className='borrad' alt="Kids multicultural" />
                                            </div>
                                            <div className='botBorder mt_1'>
                                                <img src="/Images/HairBonnets.jpeg" alt="HairBonnet" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/magCovers.jpeg" alt="Magazine" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item interval={4000}>
                                    <div className="myCaurosel">
                                        <div>
                                            <div className="inside_id">
                                                <img src="/Images/blackHoodies.jpeg" alt="Hoodies" />
                                                <img src="/Images/Shirts.jpeg" className='borrad' alt="Shirt" />
                                            </div>
                                            <div className='botBorder mt_1'>
                                                <img src="/Images/HairBonnets.jpeg" alt="hair bonnets" />
                                            </div>
                                        </div>
                                        <div className='LastColImg'>
                                            <Link to={"/magazines"}>
                                                <img src="/Images/cover.jpeg" alt="magazine" />
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div>
                            <Link to={userInfo ? "/get-featured" : "/sign-up"} className='join_now_btn'>
                                <span>
                                    Join Now
                                </span>
                                <samp>
                                    <img src="https://img.icons8.com/external-solid-kawalan-studio/24/ffffff/external-right-user-interface-solid-kawalan-studio.png" alt='Icon'/>
                                </samp>
                            </Link>
                        </div>
                    </div>
                </div> */}

                
                <div className="py_3">
                    <div className="standard_in">
                        <div className='font_36 bold6 mb_2'>
                            News
                        </div>
                        <div>
                            <div className="newsHeaderImg" style={{ backgroundColor: "#1F3F66" }}>
                                <div>
                                    <a target='_blank' rel="noreferrer" href="https://news3lv.com/amp/news/local/annual-las-vegas-kids-multicultural-fashion-festival-to-showcase-diversity">
                                        <img src="/Images/ksnv-logo.svg" alt="News Logo" />
                                    </a>
                                </div>
                                <a target='_blank' rel="noreferrer" className='font_20 bold6 text-white center2' href='https://news3lv.com/amp/news/local/annual-las-vegas-kids-multicultural-fashion-festival-to-showcase-diversity'>
                                    Annual Las Vegas Kids Multicultural Fashion Festival to showcase diversity
                                </a>
                            </div>
                            <div className='NewsContainer flex pt_2'>
                                <a className='center2' target='_blank' rel="noreferrer" href="https://news3lv.com/amp/news/local/annual-las-vegas-kids-multicultural-fashion-festival-to-showcase-diversity">
                                    <img src="/Images/news.jpeg" alt="News" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className="newsHeaderImg" style={{ backgroundColor: "#13345D" }}>
                                <div>
                                    <a target='_blank' rel="noreferrer" href="https://www.youtube.com/watch?v=cUgYfAdCFyQ">
                                        <img src="/Images/abc13.jpg" alt="News Logo" />
                                    </a>
                                </div>
                                <a target='_blank' rel="noreferrer" className='font_20 bold6 text-white center2' href='https://www.youtube.com/watch?v=cUgYfAdCFyQ'>
                                    ABC channel 13 - KTNv Tv - Kids Multicultural World Festival
                                </a>
                            </div>
                            <div className='NewsContainer flex pt_2'>
                                <a className='center2' target='_blank' rel="noreferrer" href="https://www.youtube.com/watch?v=cUgYfAdCFyQ">
                                    <img src="/Images/k13.jpg" alt="News" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py_3">
                    <div className="standard_in">
                        <div className='font_36 bold6'>
                            About
                        </div>
                        <div className="pt_5 standardTwo justify_me">
                            <div>
                                <div className="font_20 bold6">
                                    Kids Multicultural World Academy is a global youth leadership and talent-development academy coaching children to become confident leaders and global citizens. We unite kids from diverse cultures through education, creativity, and cultural activism, empowering the next generation to lead with purpose, pride, and compassion.
                                </div>
                                <div className="pt_3">
                                    Serving children ages 0–17, we offer leadership training, fashion, modeling, acting, media education, mentorship, bi-weekly magazines, and international fashion shows and festivals.
                                </div>
                            </div>
                            <div>
                                <div className="pt_4">
                                    Founded in 2017 by Queen Ambassador Dr. Krystal Chanchangi, Global Cultural Activist and youth advocate, Kids Multicultural World has empowered 38,000+ children worldwide, shaping future leaders, creatives, and changemakers.
                                </div>
                            </div>
                        </div>
                        <div className="padAbtpix">
                            <div className="about_pix_container">
                                <div>
                                    <div className='aboutPix1 flex'>
                                        <img src="/Images/kidsWorldPic.jpg" alt="Kids at Kids multicultural world" />
                                    </div>
                                    <div className='aboutPix2 flex'>
                                        <img src="/Images/KleoPatra.jpg" alt="Kids at Kids multicultural world" />
                                    </div>
                                </div>
                                <div>
                                    <div className='pt_6 aboutPix3'>
                                        <img src="/Images/mom_n_daughter.jpg" alt="Kids at Kids multicultural world" />
                                    </div>
                                    <div className="mt_1 aboutPix4">
                                        <img src="/Images/kidsWorldGroup.jpeg" alt="Kids world Group" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py_5">
                <div className="bg_ashy pb_7">
                    <div className='standard_width '>
                        <div className="standard_in">
                            <div className='font_36 bold6 pt_4'>
                                Reviews
                            </div>
                            <div className="reviews justify_me">
                                <div className='reviewContent shadow_sm'>
                                    <div className="flex">
                                        <div>
                                            <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                        </div>
                                        <div className="left_auto">
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                        </div>
                                    </div>
                                    <div className="pt_3 font_12">
                                        We had such a wonderful experience at Kids Multicultural Fashion Show. All the kids came together to celebrate their different coutures in their traditional outfits. We learned something unique about each country and made friendships. Kids we happy to receive grift bags, refreshments, certificates and trophies. After the event Krystal shared professional photographs with families. We were so happy to be part of this event and are hoping to return next year. Thank You.
                                    </div>
                                    <div className="pt_1">
                                        <div className=" font_15 bold6 text-dark pb_3">
                                            Marina Schultz
                                        </div>
                                    </div>
                                    <img className='profileReview' src="/Images/9131529.png" alt="Profile Icon" />
                                </div>
                                <div className='reviewContent shadow_sm'>
                                    <div className="flex">
                                        <div>
                                            <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                        </div>
                                        <div className="left_auto">
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                        </div>
                                    </div>
                                    <div className="pt_3 font_12">
                                        I enjoyed the fashion show and I thought the performances were fabulous. It was a nice experience for my son and family to showcase their cultures. Looking forward to next years show and I will continue to follow the organization. Very organized and a sense of community is truly established.
                                    </div>
                                    <div className="pt_1">
                                        <div className=" font_15 bold6 text-dark pb_3">
                                            Nicole Brown
                                        </div>
                                    </div>
                                    <img className='profileReview' src="/Images/9131529.png" alt='Icon' />
                                </div>
                                <div className='reviewContent shadow_sm'>
                                    <div className="flex">
                                        <div>
                                            <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                        </div>
                                        <div className="left_auto">
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                        </div>
                                    </div>
                                    <div className="pt_3 font_12">
                                        ️America Kids Multicultural World has taught my son the importance of knowing & understanding culture & roots. Helping him to better appreciate all cultures & people. Thank you so much for the experience and continued guidance
                                    </div>
                                    <div className="pt_1">
                                        <div className=" font_15 bold6 text-dark pb_3">
                                            Tasha Maria
                                        </div>
                                    </div>
                                    <img className='profileReview' src="/Images/9131529.png" alt="Profile Img" />
                                </div>
                            </div>
                            <div className="pt_4 justify_me">
                                <div className="reviews ">
                                    <div className='reviewContent shadow_sm'>
                                        <div className="flex">
                                            <div>
                                                <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                            </div>
                                            <div className="left_auto">
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            </div>
                                        </div>
                                        <div className="pt_3 font_14">
                                            ️ Ever since my daughter has been apart of this amazing family, she has blossomed in so many different ways. She has gained so much experience from her first show thanks to all the amazing kings and queens who supported and helped her. She has new friends and made new goals for her career and future. She never once felt as if she didn't belong due to lack of experience. Also walking with so many different cultures was absolutely beautiful, unifying, and gave hope for our children. I highly recommend this organization to help shape our children's future and make it so bright. Greatest opportunity ever given to my daughter. Thank you
                                        </div>
                                        <div className="pt_1">
                                            <div className=" font_15 bold6 text-dark pb_3">
                                                Danielle Brown
                                            </div>
                                        </div>
                                        <img className='profileReview' src="/Images/9131529.png" alt="Profile Icon" />
                                    </div>
                                    <div className='reviewContent shadow_sm'>
                                        <div className="flex">
                                            <div>
                                                <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                            </div>
                                            <div className="left_auto">
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                            </div>
                                        </div>
                                        <div className="pt_3 font_12">
                                            Ok, parents, magazine readers, or simply fans of America Kids Multicultural World, let me share my honest opinion. This magazine promotes our children, who are our future, our investment and our world and air. Our children are given a platform to express themselves, be heard, share stories, give advice and encourage others to keep pursuing their dreams. Being heard and seen gives our children confidence and affirmation of their place and value in the society. So wouldn't you support such an altruistic purpose of the magazine? I
                                            know that I would and I will. There are numerous magazines and other types of publications that we spend money on, making rich establishments even richer. Well, I refuse to invest in those and commit to invest in what our children can benefit from. I will support and invest into America Kids Multicultural World Magazine in any way shape and form that seems feasible to me. How YOU want to contribute into our children's future - your decision. Thank you, America Kids
                                        </div>
                                        <div className="pt_1">
                                            <div className=" font_15 bold6 text-dark pb_3">
                                                Irina Littman
                                            </div>
                                        </div>
                                        <img className='profileReview' src="/Images/9131529.png" alt="Profile represented " />
                                    </div>
                                </div>
                            </div>
                            <div className='cauroselRefReview justify_me'>
                                <Carousel>
                                    <Carousel.Item interval={2000}>
                                        <div className="reveiwCarouselContent">
                                            <div className='reviewContent shadow_sm'>
                                                <div className="flex">
                                                    <div>
                                                        <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                                    </div>
                                                    <div className="left_auto">
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                    </div>
                                                </div>
                                                <div className="pt_3 font_12">
                                                    We had such a wonderful experience at Kids Multicultural Fashion Show. All the kids came together to celebrate their different coutures in their traditional outfits. We learned something unique about each country and made friendships. Kids we happy to receive grift bags, refreshments, certificates and trophies. After the event Krystal shared professional photographs with families. We were so happy to be part of this event and are hoping to return next year. Thank You.
                                                </div>
                                                <div className="pt_1">
                                                    <div className=" font_15 bold6 text-dark pb_3">
                                                        Marina Schultz
                                                    </div>
                                                </div>
                                                <img className='profileReview' src="/Images/9131529.png" alt="Profile" />
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <div className="reveiwCarouselContent">
                                            <div className='reviewContent shadow_sm'>
                                                <div className="flex">
                                                    <div>
                                                        <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                                    </div>
                                                    <div className="left_auto">
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                    </div>
                                                </div>
                                                <div className="pt_3 font_12">
                                                    I enjoyed the fashion show and I thought the performances were fabulous. It was a nice experience for my son and family to showcase their cultures. Looking forward to next years show and I will continue to follow the organization. Very organized and a sense of community is truly established.
                                                </div>
                                                <div className="pt_1">
                                                    <div className=" font_15 bold6 text-dark pb_3">
                                                        Nicole Brown
                                                    </div>
                                                </div>
                                                <img className='profileReview' src="/Images/9131529.png" alt="Profile" />
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <div className="reveiwCarouselContent">
                                            <div className='reviewContent shadow_sm'>
                                                <div className="flex">
                                                    <div>
                                                        <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                                    </div>
                                                    <div className="left_auto">
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                    </div>
                                                </div>
                                                <div className="pt_3 font_12">
                                                    ️America Kids Multicultural World has taught my son the importance of knowing & understanding culture & roots. Helping him to better appreciate all cultures & people. Thank you so much for the experience and continued guidance
                                                </div>
                                                <div className="pt_1">
                                                    <div className=" font_15 bold6 text-dark pb_3">
                                                        Tasha Maria
                                                    </div>
                                                </div>
                                                <img className='profileReview' src="/Images/9131529.png" alt="Profile" />
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <div className="reveiwCarouselContent">
                                            <div className='reviewContent shadow_sm'>
                                                <div className="flex">
                                                    <div>
                                                        <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                                    </div>
                                                    <div className="left_auto">
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                    </div>
                                                </div>
                                                <div className="pt_3 font_14">
                                                    ️ Ever since my daughter has been apart of this amazing family, she has blossomed in so many different ways. She has gained so much experience from her first show thanks to all the amazing kings and queens who supported and helped her. She has new friends and made new goals for her career and future. She never once felt as if she didn't belong due to lack of experience. Also walking with so many different cultures was absolutely beautiful, unifying, and gave hope for our children. I highly recommend this organization to help shape our children's future and make it so bright. Greatest opportunity ever given to my daughter. Thank you
                                                </div>
                                                <div className="pt_1">
                                                    <div className=" font_15 bold6 text-dark pb_3">
                                                        Danielle Brown
                                                    </div>
                                                </div>
                                                <img className='profileReview' src="/Images/9131529.png" alt="Profile" />
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <div className="reveiwCarouselContent">
                                            <div className='reviewContent shadow_sm'>
                                                <div className="flex">
                                                    <div>
                                                        <img src="https://img.icons8.com/ios-filled/24/null/quote-left.png" alt='Icon' />
                                                    </div>
                                                    <div className="left_auto">
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                        <img src="https://img.icons8.com/color/16/null/filled-star--v1.png" alt='Icon' />
                                                    </div>
                                                </div>
                                                <div className="pt_3 font_12">
                                                    Ok, parents, magazine readers, or simply fans of America Kids Multicultural World, let me share my honest opinion. This magazine promotes our children, who are our future, our investment and our world and air. Our children are given a platform to express themselves, be heard, share stories, give advice and encourage others to keep pursuing their dreams. Being heard and seen gives our children confidence and affirmation of their place and value in the society. So wouldn't you support such an altruistic purpose of the magazine? I know that I would and I will. There are numerous magazines and other types of publications that we spend money on, making rich establishments even richer. Well, I refuse to invest in those and commit to invest in what our children can benefit from. I will support and invest into America Kids Multicultural World Magazine in any way shape and form that seems feasible to me. How YOU want to contribute into our children's future - your decision. Thank you, America Kids
                                                </div>
                                                <div className="pt_1">
                                                    <div className=" font_15 bold6 text-dark pb_3">
                                                        Irina Littman
                                                    </div>
                                                </div>
                                                <img className='profileReview' src="/Images/9131529.png" alt="..." />
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="standard_width py_7 justify_me">
                <div className="standard_in">
                    <div className="py_3 logoIndustries">
                        <div className='flexImgs'>
                            <img src="/Images/unnameds.png" alt="..." />
                        </div>
                        <div className='flexImgs'>
                            <img src="/Images/image_6483441 (2).JPG" alt="..." />
                        </div>
                        <div className='flexImgs'>
                            <img src="/Images/image_6483441 (3).JPG" alt="..." />
                        </div>
                        <div className='flexImgs'>
                            <img src="/Images/WLS_7_1996.svg" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <div className="standard_width">
                <div className="newsletterContainer shadow">
                    <div className="newsLetterText">
                        NEWS LETTER
                    </div>
                    <div className='font_14'>
                        Be the first to hear about the latest news and events happening here.
                    </div>
                    {(errors && errorsHandler) ? <Message variant={"danger"}>An error occoured</Message> : (success && errorsHandler) ? <Message variant={"success"}>Success!</Message> : ""}
                    <div className="newLetterInpuContainer">
                        <input type="text" placeholder='Input Email Address'
                            value={newsEmail}
                            onChange={(e) => setNewsEmail(e.target.value)}
                        />
                        {loading ?
                            <button type='submit'>
                                <Loader2 />
                            </button>
                            :
                            <button type='submit' disabled={loading ? true : false} onClick={submitHandler}>
                                Submit
                            </button>
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home