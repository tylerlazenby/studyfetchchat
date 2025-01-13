import getAllUsers from "@/actions/user/getAllUsers";
import AddDefaultUserForm from "@/app/AddDefaultUserForm";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Home() {
  const allUsers = await getAllUsers();

  return (
   <div className={'flex flex-col min-h-screen'}>
       <header className={'bg-white shadow-sm'}>
           <div className={'container mx-auto px-4'}>
               <div className={'flex justify-bottom items-center py-6 md:justify-start md:space-x-10'}>
                   <div className={'flex justify-start lg:w-0 lg:flex-1'}>
                       <Link href={'/'} className={'text-2xl font-bold text-gray-900'}>
                           Study Fetch PDF Tutor
                       </Link>
                   </div>
               </div>
           </div>
       </header>
       <div className={'flex-grow'}>
           <div className={'container mx-auto px-4 py-8 flex flex-col'}>
               {!allUsers.length ? (<p className={'text-red-500 font-bold'}>No Users Found. Please Create One</p>) :
                   <p>Users Found. You must sign in to continue.</p>}
               {!allUsers.length ? (<AddDefaultUserForm/>): null}
               <Button asChild>
                   <Link href={'/chat'}>Go To Chat</Link>
               </Button>
           </div>
       </div>
   </div>
  );
}
