import './App.scss'
import { Header } from './components/header/Header.tsx';
import { Slider } from "./components/slider/slider.tsx";
import { SliderSection } from "./components/SliderSection/SliderSection.tsx";
import './fonts.scss'

function App() {

  return (
    <>
      <Header />
      <Slider />
      <SliderSection />
    </>
  )
}

export default App
