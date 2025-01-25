import { Balance } from '@/app/components/Balance';
import { Spends } from '@/app/components/Spends';
import spendsData from '@/app/db/spends-data.json';

const spendsList = [];

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center w-full">
      <Balance
        balance={`96.000`}
        investing={`516.000`}
        saving={`48.000`}
      ></Balance>
      {/* <Spends spendsList={spendsData}></Spends> */}
    </div>
  );
}
