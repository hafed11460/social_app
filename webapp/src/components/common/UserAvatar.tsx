import { User } from 'features/auth/authApi';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

interface UserAvatarProps{
    size:number,
    rounded?:string
}

const UserAvatar = ({
    size=35,
    rounded='circle',
}:UserAvatarProps) => {
    const user:User | null = useSelector(selectCurrentUser)
    return (
        <div className='text-center border-0'>
            <img width={size} height={size} src={user?.avatar} className="rounded-circle" />
        </div>
    )
}

export default UserAvatar;