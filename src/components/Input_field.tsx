type Props = {
    searchTerm: string; // Текст, который пользователь в данный момент ввел в поле
    setSubmit: (value: string) => void; 
    setSearchTerm: (value: string) => void;
    // Функция, которая срабатывает при каждом нажатии клавиши
    // Где буквы, которые мы вводим, появлялись на экране
};

function InputField({ searchTerm, setSearchTerm, setSubmit }: Props) {
    return(
        <form onSubmit={(event) => {
        event.preventDefault();
        setSubmit(searchTerm);
        }}>
            <input type="text" id="id" name="id" value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Enter Steam ID" />
{/* value={searchTerm} - В поле ввода всегда будет отображаться то, что сейчас сохранено в searchTerm
    onChange={(event) => setSubmit(event.target.value)} - Каждый раз, когда пользователь нажимает букву на клавиатуре происходит изменение,
    срабатывает эта функция. Она берет то, что сейчас написано в поле,
    и с помощью setSubmit записывает это searchTerm */}
            <br />
             <button type="submit">Search</button>
        </form>
    );
}
export default InputField;