import "../styles/loadingStyle.css";
import Image from 'next/image';
import Logo from '../public/NexTask-banner.png';

export const Loading = () => {
    return <>
    <div className='container'>

        <Image src={Logo} 
        alt="Logo NexTask" 
        className="w-[80%] h-auto animate-glow_saturate self-center pt-10
        top-0 bottom-0 left-0 right-0 m-auto"
        />

        <div className='loader'>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--text'></div>
        </div>
    </div>

    </>
}