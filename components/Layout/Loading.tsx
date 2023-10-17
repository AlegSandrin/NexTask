import "../../styles/loadingStyle.css";
import Image from 'next/image';
import Logo from '../../public/NexTask-banner.png';

export const Loading = () => {
    return <>
    <div className='container'>

        <div className="w-full h-full flex items-center justify-center self-center absolute -top-28 bottom-0 left-0 right-0 m-auto">
            <Image src={Logo} 
            alt="Logo NexTask" 
            className="-md:w-[80%] md:w-[500px] h-auto animate-glow_saturate self-center"
            />
        </div>

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