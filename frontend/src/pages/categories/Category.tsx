// import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { CateogriesCarousel } from "./CarouselComp"
import {NavigationMenuDemo} from "./NavigationBar.tsx"


const Category = () => {
    return (
        <div className="flex flex-col items-center"> 
            <div className="flex-grow mt-4"> 
                <div className="flex flex-col flex-start px-9 py-9">
                    <h2 className="flex mb-8 font-bold">
                        CATEGORY 1
                    </h2>
                    <CateogriesCarousel /> 
                </div>

                <div className="flex flex-col flex-start px-9 py-9">
                    <h2 className="flex mb-8 font-bold ">
                        CATEGORY 2
                    </h2>
                    <CateogriesCarousel /> 
                </div>
                
                <div className="flex flex-col flex-start px-9 py-9 ">
                    <h2 className="flex mb-8 font-bold ">
                        CATEGORY 3
                    </h2>
                    <CateogriesCarousel /> 
                </div>
            </div>
        </div>
       
    )
}
export default Category