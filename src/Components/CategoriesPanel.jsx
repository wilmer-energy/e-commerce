import { useSelector } from "react-redux";
import "../styles/home.css"
export default function CategoriesPanel(props) {
    const { setOpenCategoryPanelDetail } = props;
    const categoryPanel = useSelector(state => state.categoryDetail.category_panel);
    return (
        <div className="flex flex-row w-screen justify-around z-10" onMouseOver={setOpenCategoryPanelDetail(true)} onMouseOut={() => {
            setOpenCategoryPanelDetail(false);
        }}>
            {
                categoryPanel.map((panel) => (
                    <ul className="z-0">
                        {panel.name}
                        {panel.childrens?.map((child) => (
                            <li className="bg-red-500 z-0">{child.name}</li>
                        ))}
                    </ul>
                ))
            }
        </div>);
};