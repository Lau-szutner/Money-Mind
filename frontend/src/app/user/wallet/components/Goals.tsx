import GoalCard from '@/app/user/wallet/components/GoalCard';

type goalsProps = {};

const Goals: React.FC<goalsProps> = () => {
  return (
    <div className="bg-bgComponents rounded-lg text-2xl w-full flex flex-col p-5 h-fit">
      <div className="border-b flex justify-between">
        <h3>Goals</h3>
        <p className="text-5xl">+</p>
      </div>
      <div className="py-5">
        <GoalCard />
      </div>
    </div>
  );
};

export default Goals;
