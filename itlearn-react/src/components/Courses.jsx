import MainHeader from "./MainHeader.jsx";
import SidebarFilter from "./SidebarFilter.jsx";
import CourseCard from "./CourseCard.jsx";

function Courses(){
    return(
        <>
            <MainHeader />
            <SidebarFilter />
            <div
                className="flex-grow-1 p-4"
                style={{ marginLeft: '250px' }}
            >
                <CourseCard
                    title="Java Basics"
                    level="Beginner"
                    description="Some plain text"
                    image=""
                />
            </div>
        </>
    )
}

export default Courses