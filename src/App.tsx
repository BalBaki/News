const App: React.FC = () => {
    // fetch('http://localhost:8080/login', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         payload: encodeURIComponent(JSON.stringify({ email: 'test12345@gmail.com', password: 'testpass' })),
    //     }),
    // })
    //     .then((response: Response): Promise<any> => response.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));

    fetch('http://localhost:8080/verify', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response: Response): Promise<any> => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

    // fetch('http://localhost:8080/register', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         payload: encodeURIComponent(
    //             JSON.stringify({
    //                 email: 'fenaaaaaaa22aaaaaaa22a@gmail.com',
    //                 password: 'testpass',
    //                 name: 'testName',
    //                 surname: 'testSurname',
    //             })
    //         ),
    //     }),
    // })
    //     .then((response: Response): Promise<any> => response.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));

    fetch('http://localhost:8080/savesettings', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload: encodeURIComponent(
                JSON.stringify({
                    apis: ['3', '4'],
                    term: 'bitcoin',
                })
            ),
        }),
    })
        .then((response: Response): Promise<any> => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

    return <div>App</div>;
};

export default App;
