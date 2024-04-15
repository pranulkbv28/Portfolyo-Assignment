import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Services from "../components/services/Services";
import Skills from "../components/skills/Skills";
import Projects from "../components/projects/Projects";
import Timeline from "../components/timelines/Timeline";
import Testimonial from "../components/testimonials/Testimonial";
import Contact from "../components/contact/Contact";
import styles from "./home.module.css";

function Home() {
    const params = useParams();
    const navigate = useNavigate();

    const userId = "65b3a22c01d900e96c4219ae"; //John doe

    const BASE_URL = "https://portfolio-backend-30mp.onrender.com/api/v1";

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        document.cookie = `portfolio-name=portfolio1`;
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get/user/${params?.user ?? userId}`);

                const userData = await response.json();

                document.title = `${userData?.user?.about?.name + " - " + userData?.user?.about?.title}`;
                setUser(userData?.user);
                setIsLoading(false);
                document.body.classList.remove("loaded");
            } catch (error) {
                navigate("/");
                setIsLoading(true);
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [params?.user, userId, navigate]);
    console.log(user);

    // filtering all the data from the API
    const sortedFilteredSkills = user?.skills?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const sortedFilteredProject = user?.projects?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const filteredServices = user?.services?.filter((item) => item.enabled);
    const filteredTestimonials = user?.testimonials?.filter((item) => item.enabled);
    const filteredSocialHandles = user?.social_handles?.filter((item) => item.enabled);
    const filteredEducation = user?.timeline?.filter((item) => item.forEducation && item.enabled);
    const filteredExperience = user?.timeline?.filter((item) => !item.forEducation && item.enabled);

    useEffect(() => {
        let scrollTimeout = null;

        const handleScroll = () => {
            setIsScrolling(true);
            console.log("is scrolling");
            console.log(isScrolling);

            // Clear the previous timeout
            if (scrollTimeout !== null) {
                clearTimeout(scrollTimeout);
            }

            // Set isScrolling to false 500ms after the last scroll event
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener and timeout when the component is unmounted
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout !== null) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [isScrolling]);

    if (isLoading) {
        return <div className="w-full h-screen bg-black flex items-center justify-center text-center">Loading..</div>;
    }
    return (
        <div className={`bg-black text-white ${styles.body}`}>
            <div
                className={`fixed w-3/5 h-auto p-2 mx-auto border border-solid rounded-lg border-white ${isScrolling ? `opacity-100 top-[5%] visible` : `opacity-0 top-[-5%] invisible`} duration-200 ease-in-out ${styles.headerBody}`}
                id="header"
            >
                <Header />
            </div>
            <div className="h-screen" id="hero">
                <Hero name={user.about.name} />
            </div>
            <div className="h-screen" id="about">
                <About about={user.about} />
            </div>
            <div className="h-screen" id="skills">
                <Skills skills={sortedFilteredSkills} />
            </div>
            <div className="h-screen" id="projects">
                <Projects projects={sortedFilteredProject} />
            </div>
            <div className="h-screen" id="services">
                <Services services={filteredServices} />
            </div>
            <div className="h-screen" id="timeline">
                <Timeline education={filteredEducation} experience={filteredExperience} />
            </div>
            <div className="h-screen" id="testimonials">
                <Testimonial testimonials={filteredTestimonials} />
            </div>
            <div className="h-screen" id="contact">
                <Contact socialHandles={filteredSocialHandles} />
            </div>
        </div>
    );
}

export default Home;
