import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import authService from '@/services/auth/auth.service'
import { IFormData } from '@/types/types'

export function useAuthForm(isLogin: boolean) {
	const { register, handleSubmit, reset } = useForm<IFormData>()

	const [isPending, startTransition] = useTransition()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.main('login', data),
		onSuccess() {
			startTransition(() => {
				reset()
				window.location.href = '/'
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IFormData) => authService.main('register', data),
		onSuccess() {
			startTransition(() => {
				reset()
				window.location.href = '/'
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		}
	})

	const onSubmit: SubmitHandler<IFormData> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	const isLoading = isPending || isLoginPending || isRegisterPending

	return {
		register,
		handleSubmit,
		onSubmit,
		isLoading
	}
}
