export default function LinkTool({ data }: any) {
  const openLink = () => {
    window.open(data.link);
  };

  return <a onClick={() => openLink()}>{data.link}</a>;
}
