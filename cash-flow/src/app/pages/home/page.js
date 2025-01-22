import { Balance } from "@/app/components/Balance"
import { Spends } from "@/app/components/Spends"

const spendsList = [
  {
    "title": "comida",
    "price": "$430.000"
  },
  {
    "title": "comida",
    "price": "$30.000"
  },
  {
    "title": "comida",
    "price": "$10.000"
  }
  
]

export default function Home() {
    return <div className="flex justify-center">
    
    <Balance balance={`96.000`} investing={`516.000`} saving={`48.000`}></Balance>
    <Spends spendsList={spendsList}></Spends>    
    </div>
  }