'use client';

import { Loading } from "@/components/Loading";
import { UserInfo } from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // Se o usuário não estiver logado, redireciona para página de login
      router.push('/login');
    }

    return () => {};
  },[])

  if (status === 'loading') return <Loading/>
  
  if (session)
  return (
    <main className="flex justify-center items-center h-full">
      <UserInfo/>
    </main>
  )
}
