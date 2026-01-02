type Props = {
  title: string;
};

export default function Button({ title }: Props) {
  return (
    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
      {title}
    </button>
  );
}
