interface AvatarProps {
    rounded?: string,
    size?: number,
    src?: string
}

const Avatar = ({ src, size = 35, rounded = 'circle', }: AvatarProps) => {

    return (
        <span>
            <img width={size} height={size} src={src} className="rounded-circle " />
        </span>
    )
}

export default Avatar;