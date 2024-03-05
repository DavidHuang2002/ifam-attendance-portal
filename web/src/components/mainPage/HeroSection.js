import { Carousel } from "antd";
import Image from "next/image";

const HeroImage = ({
    imagePath,
    imageAlt
}) => {
    // console.log(imagePath);
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "80vh",
                overflow: "hidden",
            }}
        >
            <Image
                alt={imageAlt}
                src={imagePath}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
        </div>
    );
}


export default function HeroSection() {
    return (
        <div style={{
            marginBottom: "40px"
        }}>
            <Carousel
                autoplay
                style={{ width: "100%" }}
            >
                <HeroImage
                    imagePath="/hero-section/ifam-campus.png"
                    imageAlt="I-Fam Logo"
                />

                <HeroImage
                    imagePath="/hero-section/ifam-dinner.jpeg"
                    imageAlt="dinner and discussion event"
                />

                <HeroImage
                    imagePath="/hero-section/dinner.jpeg"
                    imageAlt="I-Fam Logo"
                />
            </Carousel>
        </div>
    )
}