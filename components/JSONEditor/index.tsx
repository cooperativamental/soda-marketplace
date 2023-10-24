import { useIDL } from '@/context/IDL';
// import CodeMirror from '@uiw/react-codemirror';
import Monaco from '@monaco-editor/react';
import { FC, useState } from 'react';
import { githubDark } from '@uiw/codemirror-theme-github';


const JSONEditor: FC<any> = ({ noeditable }) => {
    const { IDL, setIDL } = useIDL()
    const [errorIDL, setErrorIDL] = useState("")
    const handlerIDL = (value: any) => {
        try {
            setErrorIDL("")
            const parse = JSON.parse(value)
            setIDL(parse)
        } catch (error: any) {
            setErrorIDL(error.toString())
        }

    }
    return (
        <div className=' border-t-1 border-border'>
            <p className='text-red'>{errorIDL}</p>
            <Monaco
                className='h-[calc(100vh_-_17rem)]'
                options={{readOnly: noeditable}}
                language='json'
                value={JSON.stringify(IDL, null, "\t")}
                onChange={handlerIDL}
                theme="vs-dark"
            />
        </div>
    )
}

export default JSONEditor