import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardTitle } from "../../components/ui/card.tsx";
import {CarouselSize} from "./CarouselComp.tsx";
import NavigationBar from "./NavigationBar";

const Home = () => {
    return(
        <div className="flex font-sans flex-col items-center">
            <div className="w-full max-w-screen-lg px-8">
                <div className="mt-20">
                    <h2 className="font-bold text-2xl">CATEGORIES</h2>
                    <div className="grid grid-cols-4 grid-flow-row gap-8 py-10">
                        {Array.from({ length: 8 }).map((_, index) => (
                        <Card className="flex justify-center 
                            w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                        <CardContent className="flex items-center justify-center p-6">
                            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                                CUISINE {index + 1}
                            </span>
                        </CardContent>
                        </Card>
                        ))}
                    </div>
            </div>
              
            <div className="m-9 px-12">
                <h2 className="font-semibold">Search By tags</h2>
                <Input className='m-3 mx-auto bg-white' type='text' placeholder="Search by tags..."/>
                <p className="font-light">Tags may include: ingredients, diet, country, etc...</p>
            </div>
            
            </div>
            

        </div>
    )
  }

  export default Home