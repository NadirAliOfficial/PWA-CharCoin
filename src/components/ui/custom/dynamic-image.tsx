

interface IconProps {
  path: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const DynamicIcon = ({ path, alt = "icon", width = 24, height = 24, className = "" }: IconProps) => {
  return <img src={path} alt={alt} width={width} height={height} className={className} />;
};

export default DynamicIcon;
