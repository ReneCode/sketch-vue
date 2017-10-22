import IaBase from './ia-base'
import interaction from '@/interaction';
import store from '@/store';
import ItemImage from '@/models/item-image';
import Point from '@/models/point';
import temporaryItemList from '@/store/temporary-item-list';

export default class IaImage extends IaBase {
  image = null;
  itemImage = null;
  fileName = null;

  start(options) {
    this.options = options;
    if (!options.fileInput) {
      throw new Error("fileInput missing");
    }

    // select image from local computer
    const self = this;
    this.fileChangedHandler = (ev) => { self.onFileChanged(ev); }
    options.fileInput.addEventListener('change', this.fileChangedHandler);
    options.fileInput.click();
  }

  stop() {
    interaction.stop(this.iaOnePoint);
    return "stop";
  }

  onFileChanged(event) {
    // that image is localy selected
    event.target.removeEventListener('change', this.fileChangedHandler);
    this.image = event.target.files[0];
    const pt = new Point(0, 0);

    // read that image to local store for temporary preview
    const fileReader = new FileReader();
    const self = this;
    fileReader.addEventListener('load', () => {
      const localUrl = fileReader.result;
      self.itemImage = new ItemImage(pt, localUrl);
      temporaryItemList.add(this.itemImage);

      // now start interaction to place that image
      const opt = {
        callbackName: "iaImageCallback"
      }
      self.iaOnePoint = interaction.start('iaOnePoint', opt);
    });
    fileReader.readAsDataURL(this.image);
  }

  iaImageCallback(payload) {
    switch (payload.event) {
      case "escape":
        this.cleanUp();
        return this.stop();
      case "onPoint":
        return this.onPoint(payload.pt);
      case "onPointMove":
        return this.onPointMove(payload.pt);
    }
  }

  onPoint(pt) {
    if (this.itemImage) {
      this.itemImage.setPosition(pt);
      this.saveImage();
      return this.stop();
    }
  }

  onPointMove(pt) {
    if (this.itemImage) {
      this.itemImage.setPosition(pt);
    }
  }

  saveImage() {
    const payload = {
      projectId: this.options.projectId,
      pageId: this.options.pageId,
      image: this.image,
      svg: this.itemImage.svg
    };
    store.dispatch('createGraphic', payload)
      .then(() => {
        this.cleanUp();
      })
  }

  cleanUp() {
    if (this.itemImage) {
      temporaryItemList.remove(this.itemImage);
      this.itemImage = null;
    }
  }
}
