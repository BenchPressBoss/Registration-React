import userService from '@/services/user.service'

import { useQuery } from '@tanstack/react-query'
import { transformUserToState } from './transform-user-to-state'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.fetchProfile(),
		retry: 1,
		refetchInterval: 1800000 // 30 minutes in milliseconds,
	})

	const profile = data?.data

	const userState = profile ? transformUserToState(profile) : null

	return {
		isLoading,

		user: {
			...profile,
			...userState
		}
	}
}
