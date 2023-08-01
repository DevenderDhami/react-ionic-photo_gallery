import './Photos.css';
import { camera, trash, close } from 'ionicons/icons';
import { images, square, triangle } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { usePhotoGallery, UserPhoto } from '../../hooks/usePhotoGallery';
import { useState } from 'react';
const Photos: React.FC = () => {
  const { takePhoto, photos, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PhotoGallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {photos?.map((photo: any, index: any) => (
              <IonCol size="6" key={photo?.filepath}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 2 page" /> */}


        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};

export default Photos;
