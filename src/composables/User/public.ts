import { Ref } from "vue";
import { NInput } from "naive-ui";

// 编辑组件
const ShowOrEdit = defineComponent({
	// 设置组件属性
	props: {
		value: [String, Number],
		onUpdateValue: [Function, Array],
	},
	// setup函数
	setup(props: any) {
		const isEdit = ref(false); // 设置编辑状态
		const inputRef = ref<null | HTMLElement>(null); // 获取到编辑元素
		const inputValue = ref(props.value); // 编辑元素绑定
		// 点击事件触发编辑开启
		function handleOnClick() {
			isEdit.value = true;
			nextTick(() => {
				(inputRef as Ref<HTMLElement>).value.focus();
			});
		}
		// 失去焦点，用户离开输入框
		function handleChange() {
			props.onUpdateValue(inputValue.value);
			isEdit.value = false;
		}
		return () =>
			h(
				"div",
				{
					onClick: handleOnClick,
				},
				isEdit.value
					? h(NInput, {
							ref: inputRef,
							value: inputValue.value,
							size: "small",
							onUpdateValue: (v) => {
								inputValue.value = v;
							},
							onChange: handleChange,
							onBlur: handleChange,
					  })
					: props.value
			);
	},
});

interface Category {
	id: number;
	name: string;
	classNum: number;
	movieNum: number;
	create?: boolean;
}

interface Movie {
	id: number;
	name: string;
	description: string;
	duration: string;
	director: string;
}

interface Source {
	id: number;
	name: string;
	url: string;
	complete: boolean;
	getting: boolean;
	create?: boolean;
}

interface Class {
	id: number;
	name: string;
	get: boolean;
	categoryId?: number;
}

//以下是本站搜索功能所使用的的防抖函数，和上面略有不同
function createDelayFunction(fn: Function, timeout = 400) {
	let timeoutId = -1;
	return (...args: any) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn(...args);
		}, timeout);
	};
}

export { ShowOrEdit, createDelayFunction };
export type { Category, Movie, Source, Class };
