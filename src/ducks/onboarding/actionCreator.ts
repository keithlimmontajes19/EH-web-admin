import { TYPES } from './actionTypes'

export const postWebBriefOnboaring = (payload: any) => ({
    type: TYPES.POST_ONBOARDING_YOU_REQUEST,
    payload
})

export const postCreativeProvider = (payload: any) => ({
    type: TYPES.POST_CREATIVE_PROVIDER_REQUEST,
    payload
})
