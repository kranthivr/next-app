interface Props {
  params: { id: number; photoId: number };
}

const PhotosDetailPage = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      <div>User Page {id}</div>
      <div>PhotosDetailPage {photoId}</div>
    </div>
  );
};

export default PhotosDetailPage;
