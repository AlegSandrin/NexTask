import Image from "next/image"
import { useSession } from "next-auth/react";

export const UserInfo = () => {

    const { status, data: session } = useSession();
    const userImage = session?.user?.image;

    if (status === "authenticated")
    return (
        <div>
            { userImage && <Image src={userImage} alt="Foto de perfil do usuário" width={60} height={60}/> }
            <span>
                Nome: <span className="font-medium">{session?.user?.name}</span>
            </span>
            <span>
                Email: <span className="font-medium">{session?.user?.email}</span>
            </span>
        </div>
    )
}