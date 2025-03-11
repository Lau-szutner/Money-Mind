import { Balance } from '@/app/components/Balance';
import { Spends } from '@/app/components/Spends';
import spendsData from '@/app/db/spends-data.json';
import { Navbar } from '@/app/components/Navbar';
import Footer from './components/Footer';
import GraphicExpenses from '@/app/components/GraphicExpenses';
const spendsList = [];

export default function Home() {
  return (
    <div className="grid ">
      <Navbar></Navbar>
      <Balance
        balance={`96.000`}
        monthly={`516.000`}
        saving={`48.000`}
      ></Balance>
      <GraphicExpenses></GraphicExpenses>
      {/* <Spends spendsList={spendsData}></Spends> */}
      <Footer></Footer>
    </div>
  );
}
