import * as React from 'react'

const welcome = {
    greeting: 'Hey',
    title: 'Checker'
}

const list = [
    {
        id: "Typescript",
        title: "Best Typescript books",
        url: "https://duckduckgo.com",
        actor: "Marina",
        comments: 5
    },
    {
        id: "React",
        title: "Best React Book",
        url: "httsp://duckduckgo.com",
        actor: "Yukia",
        comments: 1
    }
]

function useCustomHook(key, initialState) {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState);

    React.useEffect(() => {
        localStorage.setItem('search', value);
    }, [value]);

    return [value, setValue];
}

function App() {
    let [searchTerm, setSearchTerm] = useCustomHook('search', 'React');

    const onSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const searched_list = list.filter(item => (
        item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));

    return (
        <div>
        <h1> {welcome.greeting} {welcome.title} </h1>
        <Search search={searchTerm}  onSearch={onSearch}/>
        <hr/>
        <List list={searched_list}/>
        </div>

    );
}

const InputWithLabel = ({id, type = 'text', value, onChange, children}) => (
    <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onChange}/>
    </>
)

const Search = ({search, onSearch}) => {
    return (
        <div>
            <InputWithLabel id='search' value={search} onChange={onSearch}>
                <strong>Search: </strong>
            </InputWithLabel>
        </div>
    );
}

const List = ({list}) => (
    <ul>
    {list.map(item => (
        <Item key={item.id} item={item}/>
    ))}
    </ul>
)

// NOTE: need to pass value to attribute key when component content <li>
const Item = ({item}) => (
    <li>
    <span>
    <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.actor}</span>
    <span>{item.comments}</span>
    </li>
)

export default App;
