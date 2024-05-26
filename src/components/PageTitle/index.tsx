interface PageTitleInterface {
    title: string;
}

const PageTitle: React.FC<PageTitleInterface> = ({ title }) => {
    return (
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
        </div>
    )
}

export default PageTitle