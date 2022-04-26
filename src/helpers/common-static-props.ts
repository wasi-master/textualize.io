import { GetStaticProps } from "next"
import type { ProjectData } from "../domain"
import * as githubBackendServices from "../services/backend/github"
import * as projectsBackendServices from "../services/backend/projects"

interface CommonStaticProps {
    projectsData: ProjectData[]
}

export const getStaticProps: GetStaticProps<CommonStaticProps> = async (_context) => {
    const projectsData = await projectsBackendServices.projects()
    await githubBackendServices.attachCurrentStarsCountsToRepositories(projectsData)

    return {
        props: { projectsData },
    }
}
