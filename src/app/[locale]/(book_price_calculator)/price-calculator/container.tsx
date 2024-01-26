
export const Container =(props:any)=>{

    return <div className={`${props.classes} ${props.firstSetion? 'mt-[100px] lg:mt-[200px]':''}  ${props.dontCenter?'':'mx-auto'} mb-10`} style={{ marginBottom:props.mb? props.mb: '10px' }} onClick={props.onClick} >{props.children} </div>
}


export const ContainerGrid =(props:any)=>{

    return <div className={`${props.classes} block mx-auto md:grid lg:grid ${props.gridCols? props.gridCols: 'md:grid-cols-2 lg:grid-cols-4'}  ${props.gridGap? props.gridGap: 'gap-1'} mx-auto mb-10`} style={{width: props.width? props.width: '100%', marginBottom:props.mb? props.mb: '10px' }} onClick={props.onClick} >{props.children} </div>
}

export const ContainerFlex =(props:any)=>{

    return <div className={`${props.classes} mx-auto md:flex  ${props.gridGap? props.gridGap: 'gap-1'} mx-auto mb-10`} style={{width: props.width? props.width: '100%', marginBottom:props.mb? props.mb: '10px' }} onClick={props.onClick} >{props.children} </div>
}




export const Row =(props:any)=>{

    return <div className={`${props.classes}  `} onClick={props.onClick}
    style={{ marginBottom:props.mb? props.mb: '50px' }} 
    
    >{props.children} </div>
}

 