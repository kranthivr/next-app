interface Props {
  params: { id: number; photoId: number };
}

const Photos = ({ params: { id } }: Props) => {
  return <div>Photos of User: {id}</div>;
};

export default Photos;
