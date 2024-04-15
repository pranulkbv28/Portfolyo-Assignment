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
    // const [isSending, setIsSending] = useState(false);

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

    if (isLoading) {
        return <div className="w-full h-screen bg-black flex items-center justify-center text-center">Loading..</div>;
    }
    return (
        <div className={`${styles.body}`}>
            <div className={`fixed top-0 w-3/5 mx-auto border border-solid border-black p-2 rounded-lg ${styles.headerBody}`} id="header">
                <Header />
            </div>
            <div id="hero">
                <Hero name={user.about.name} />
            </div>
            <div id="about">
                <About about={user.about} />
            </div>
            <div id="skills">
                <Skills skills={sortedFilteredSkills} />
            </div>
            <div id="projects">
                <Projects projects={sortedFilteredProject} />
            </div>
            <div id="services">
                <Services services={filteredServices} />
            </div>
            <div id="timeline">
                <Timeline education={filteredEducation} experience={filteredExperience} />
            </div>
            <div id="testimonials">
                <Testimonial testimonials={filteredTestimonials} />
            </div>
            <div id="contact">
                <Contact socialHandles={filteredSocialHandles} />
            </div>
        </div>
    );
}

export default Home;
