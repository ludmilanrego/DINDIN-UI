import './styles.css';

export default function CardOfCategory({ category, categoryList, setCategoryList }) {

    function toggleSelectedStatus() {
        const localcategoryList = [...categoryList]

        const selectedCategory = localcategoryList.find((localCategory) => {
            return localCategory.id === category.id;
        });

        selectedCategory.selectStatus = !selectedCategory.selectStatus

        setCategoryList(localcategoryList)
    }

    return (
        <div className="card-of-category">

            <button className={(category.selectStatus ? 'card selected' : 'card')}
                onClick={() => toggleSelectedStatus()}>
                <span>{category.descricao}</span>
                <span>{(category.selectStatus ? '+' : 'x')}</span>
            </button>
        </div>
    )
}