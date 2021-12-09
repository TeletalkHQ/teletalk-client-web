import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const responseHandler = (response) => {
	try {
		let error = null;

		const rejection = () => Promise.reject(error);

		if (response.status >= 500) {
			switch (response.status) {
				case 500:
					appDispatch();
					// helperRequestFailedModal(
					// 	"درخواست با خطا مواجه شد. لطفا بعد از چند دقیقه دیگر امتحان کنید و یا با پشتیبانی تماس بگیرید",
					// ),
					rejection();

					return;

				default:
					appDispatch();
					// helperRequestFailedModal(
					// 	"درخواست با خطا مواجه شد. لطفا بعد از چند دقیقه دیگر امتحان کنید و یا با پشتیبانی تماس بگیرید",
					// ),
					rejection();

					return;
			}
		}

		if (response.status >= 400) {
			switch (response.status) {
				case 401:
					localStorage.clear();
					appDispatch({ type: "USER_CLEARED" });
					return rejection();

				case 805:
					error.detail === "Cellphone not exist"
						? appDispatch()
						: // helperRequestFailedModal(
						  // 	"شماره موردنظر ثبت نشده است. به صفحه ثبت نام مراجعه شود",
						  // 	incorrectNumber,
						  // 	"cellphoneNotExist",
						  // ),
						  appDispatch();
					// helperRequestFailedModal(
					// 	"شماره قبلا ثبت شده است. به صفحه ورود مراجعه شود",
					// 	incorrectNumber,
					// 	"cellphoneExist",
					// ),
					return rejection();

				case 804:
					appDispatch();
					// helperRequestFailedNotify("کد واردشده صحیح نمی باشد")
					return rejection();

				case 823:
					appDispatch();
					// helperRequestFailedNotify("سفارش موردنظر لغو نشد")
					return rejection();

				case 826:
					appDispatch();
					// helperRequestFailedNotify(
					// 	"خدمات دهنده موردنظر قابل انتخاب نمی باشد. لطفا خدمات دهنده دیگری را انتخاب کنید و یا صفحه را مجددا بارگذاری کنید",
					// ),

					return rejection();

				default:
					appDispatch();
					// helperRequestFailedNotify()
					return rejection();
			}
		}

		return response;
	} catch (error) {}
};

export { responseHandler };
