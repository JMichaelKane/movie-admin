import { ref } from "vue";

interface Path {
	name: string;
	params: object | null;
	to: string | null;
}

const paths = ref<Path[]>([]);

export { paths };
