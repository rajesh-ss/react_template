export function reduxStateTemplate<SuccessResponseType extends object, ErrorResponseType extends object>(
	successResponse: SuccessResponseType | null = null,
	errorResponse: ErrorResponseType | null = null,
) {
	return {
		isLoading: false,
		data: successResponse,
		error: errorResponse,
	};
}

// export type isSideBarOpen = {

// }
