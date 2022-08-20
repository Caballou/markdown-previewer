import './App.css';
import { useState } from 'react';
import React from 'react';
import Markdown from 'marked-react';

  /* Componente del editor al estar minimizado (desactivado) */
const Editor = React.memo(({value, setValue}) => {
  return (
  <textarea id='editor'  
  value={value} onChange={nuevo => setValue(nuevo.target.value)}>

  </textarea>
  )});

  /* Componente del editor al estar en modo pantalla completa (activo) */
const EditorFull = React.memo(({value, setValue}) => {
  return (
    <textarea id='editor'  
  value={value} style={{height: '100vh'}} onChange={nuevo => setValue(nuevo.target.value)}>

  </textarea>
  )
})

function App() {

  /* Estados del editor, preview y texto */
  const [editorActivo, setEditorActivo] = useState(false)

  const [previewActivo, setPreviewActivo] = useState(false);

  const [texto, setTexto] = useState( 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`);

  const clickearEditor = () => { /* Cambio de estado al clickear el botón del editor */
    setEditorActivo(actual => !actual)
  };

  const clickearPreview = () => { /* Cambio de estado al clickear el botón de la preview */
    setPreviewActivo(actual => !actual)
  };

  return (
    <div className='App'>

      { editorActivo ? ( /* Si está activo el editor (al clickear en maximizar editor), se renderiza sólo el editor en pantalla completa (100vh) */
        
      <div className='contenedor-editor'>
        <div className='banner-editor'>
          Editor
          <i className='fa fa-compress icono-editor' 
          onClick={clickearEditor}></i>
        </div>
        <EditorFull value={texto} setValue={setTexto}/>
      </div> 

      ) :  (previewActivo) ? ( /* Si la preview está activa (al clickear en maximizar preview), se renderiza sólo la vista previa */

        <div className='contenedor-preview'>
        <div className='banner-preview'>
          Previewer
          <i className='fa fa-compress icono-preview'
          onClick={clickearPreview}></i>
        </div>
        <div className='texto-preview' id='preview'>
          <Markdown breaks="true">{texto}</Markdown>
        </div>
      </div>
      
      ) : ( /* Si ni la preview ni el editor están activos, se muestran ambos en sus tamaños predeterminados */

        <>
        <div className='contenedor-editor'>
          <div className='banner-editor'>
            Editor
            <i className='fa fa-arrows-alt icono-editor'
              onClick={clickearEditor}></i>
          </div>
          <Editor value={texto} setValue={setTexto} />
        </div>
        
        <div className='contenedor-preview'>
          <div className='banner-preview'>
            Previewer
            <i className='fa fa-arrows-alt icono-preview'
              onClick={clickearPreview}></i>
          </div>
          <div className='texto-preview' id='preview'>
            <Markdown breaks="true">{texto}</Markdown>
          </div>
        </div></>)
      }
      <div className='firma'>
        By Caballou 🐴
      </div>
    </div>
  );
}

export default App;
