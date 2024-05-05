import Image from 'next/image';
import { auth } from '../../../../../auth';
import SignIn from './SignIn';
import SignOut from './SignOut';

const Profile = async () => {
  const session = await auth();

  if (!session) return <SignIn />;

  return (
    <div className="dropdown dropdown-end mr-4">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Profile"
            className="rounded-full"
            width={40}
            height={40}
            src={session?.user?.image}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <SignOut />
        </li>
      </ul>
    </div>
  );
};

export default Profile;
