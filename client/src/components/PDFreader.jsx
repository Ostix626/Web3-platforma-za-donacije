import React, { useLayoutEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite.js';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import SmallLoader from './SmallLoader';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

const PDFreader = ({src}) => {

    const [numPages, setNumPages] = useState(null);
  
    function onDocumentLoadSuccess({numPages}){
      setNumPages(numPages);
    }
  
    const [width, setWidth] = useState(200);
    const containerRef = useRef(null);
  
    useLayoutEffect(() => {
      function updateWidth() {
        const containerWidth = containerRef.current.clientWidth;
        setWidth(containerWidth)
      }
  
      window.addEventListener('resize', updateWidth);
  
      updateWidth();
  
      return () => window.removeEventListener('resize', updateWidth);
    }, []);


  return (
    <div>
        <header>
        <h4 className="font-epilogue font-semibold text-[18px] text-headerText uppercase mb-[20px]">INFO</h4>
            <div style={{ width: '100%' }} className="shadow-secondary" ref={containerRef}>
                <Document 
                    file={src.toString()} 
                    onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(
                    new Array(numPages),
                    (el,index) => (
                    <Page 
                        renderMode="canvas"
                        renderTextLayer={false}
                        width={width}
                        loading={<SmallLoader/>}
                        key={`page_${index+1}`}
                        pageNumber={index+1}
                    />
                    )
                )}
                </Document>
            </div>
        </header>
    
    </div>

  )
}

export default PDFreader

