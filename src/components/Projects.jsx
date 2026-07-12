function Projects(pros){
    return(
        <section>
            <h1>
                Projects
            </h1>
            <ul>
                {pros.projectlist.map((project,index)=>(
                    <li key={index}>
                        {project}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Projects;