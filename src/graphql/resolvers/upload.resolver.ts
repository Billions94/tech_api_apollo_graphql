

export const uploadResolver = {
    Mutation: {
        uploader: async (_: undefined, { file }: any) => {
            console.log({ file })
        }
    }
}