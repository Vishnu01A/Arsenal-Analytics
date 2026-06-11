type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
