import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const responseHandler = async (response) => {
	// try {

	const rejection = () => {
		return response;
	};
	return await response.then((res) => {
		console.log(res);
		if (res.status >= 500) {
			switch (res.status) {
				case 500:
					appDispatch();
					// helperRequestFailedModal(
					// 	"درخواست با خطا مواجه شد. لطفا بعد از چند دقیقه دیگر امتحان کنید و یا با پشتیبانی تماس بگیرید",
					// ),
					rejection();

					return res;

				default:
					appDispatch();
					// helperRequestFailedModal(
					// 	"درخواست با خطا مواجه شد. لطفا بعد از چند دقیقه دیگر امتحان کنید و یا با پشتیبانی تماس بگیرید",
					// ),
					rejection();

					return res;
			}
		}

		if (res.status >= 400) {
			switch (res.status) {
				case 400:
					rejection();
					return res;

				case 401:
					localStorage.clear();
					appDispatch({ type: "USER_CLEARED" });
					rejection();
					return res;

				case 805:
					// ? appDispatch()
					// : // helperRequestFailedModal(
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
					rejection();
					return res;

				case 804:
					appDispatch();
					// helperRequestFailedNotify("کد واردشده صحیح نمی باشد")
					rejection();
					return res;

				case 823:
					appDispatch();
					// helperRequestFailedNotify("سفارش موردنظر لغو نشد")
					rejection();
					return res;

				case 826:
					appDispatch();
					// helperRequestFailedNotify(
					// 	"خدمات دهنده موردنظر قابل انتخاب نمی باشد. لطفا خدمات دهنده دیگری را انتخاب کنید و یا صفحه را مجددا بارگذاری کنید",
					// ),

					rejection();
					return res;

				default:
					appDispatch();
					// helperRequestFailedNotify()
					rejection();
					return res;
			}
		}

		return res;
		// } catch (error) {
		// return response;
		// }
	});
};

export { responseHandler };
