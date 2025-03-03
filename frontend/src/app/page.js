import { Balance } from '@/app/components/Balance';
import { Spends } from '@/app/components/Spends';
import spendsData from '@/app/db/spends-data.json';
import { Navbar } from '@/app/components/Navbar';
import Footer from './components/Footer';

const spendsList = [];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <Navbar></Navbar>
      <Balance
        balance={`96.000`}
        investing={`516.000`}
        saving={`48.000`}
      ></Balance>
      <Spends spendsList={spendsData}></Spends>
      <Footer></Footer>
    </div>
  );
}
