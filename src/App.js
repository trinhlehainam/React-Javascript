import * as React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

import {NavBar} from './navbar'

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
        localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
}

function App() {
    let [searchTerm, setSearchTerm] = useCustomHook('search', 'React');
    let [isLoading, setLoading] = React.useState(false);

    const types = {
        INIT: 'INIT',
        REMOVE: 'REMOVE'
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case types.INIT:
                return action.payload;
            case types.REMOVE:
                return state.filter(item => item.id !== action.id);
        }
    }
    let [stories, dispatchStories] = React.useReducer(reducer, []);

    const getData = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve(list), 1000);
    });

    React.useEffect(() => {
        setLoading(true);

        getData().then(result => {
            dispatchStories({type: types.INIT, payload: list})
            setLoading(false);
        });
    }, []);

    const onSearchItem = (event) => {
        setSearchTerm(event.target.value);
    }

    const onRemoveItem = (item_id) => {
        console.log(item_id);
        dispatchStories({type: types.REMOVE, id: item_id});
    }

    const searched_list = stories.filter(item => (
        item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));

    return (
        <div>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                       {welcome.greeting} {welcome.title}
                    </Typography>
                </Toolbar>
                <NavBar />
            </AppBar>
        <Search search={searchTerm}  onSearch={onSearchItem}/>
        <hr/>
        {isLoading ? <p>...Is loading</p> : <List list={searched_list} onRemoveItem={onRemoveItem}/>}
        </div>

    );
}

const InputWithLabel = ({id, type = 'text', value, isFocus = false, onChange, children}) => {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (inputRef.current && isFocus){
            inputRef.current.focus();
        }
    }, [isFocus])

    return (
    <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocus} onChange={onChange}/>
    </>
    )
}

const Search = ({search, onSearch}) => {
    return (
        <div>
            <InputWithLabel id='search' value={search} isFocus={true} onChange={onSearch}>
                <strong>Search: </strong>
            </InputWithLabel>
        </div>
    );
}

const List = ({list, onRemoveItem}) => (
    <ul>
    {list.map(item => (
        <Item key={item.id} item={item} onRemoveItem={onRemoveItem}/>
    ))}
    </ul>
)

// NOTE: need to pass value to attribute key when component content <li>
const Item = ({item, onRemoveItem}) => (
    <li>
    <span>
    <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.actor}</span>
    <span>{item.comments}</span>
    <span>
    <button type="button" onClick={() => onRemoveItem(item.id)}>
    Dismiss
    </button>
    </span>
    </li>
)

export default App;
