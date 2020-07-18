import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit, Renderer, RendererStyleFlags2, Inject } from '@angular/core';

@Component({
  selector: 'colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css']
})
export class ColourPickerComponent implements OnInit, AfterViewInit {

  colourValueRed: number = 40;
  colourValueGreen: number = 200;
  colourValueBlue: number = 30;
  colourValueBrightness: number = 1;

  bUseScreenResolution: boolean = true;

  private _bViewLoaded: boolean = false;

  private _bChangingColour: boolean = false;
  private _bChangingBrightness: boolean = false;

  iSelectedResolutionId: number = 0;

  resolutions: string[] = [
    "1080x1200",
    "1920x1080",
    "1280x720"
  ];

  @ViewChild("colourPreviewBox", { static: false }) _viewChildColourPreviewBox: ElementRef;

  constructor(private _renderer: Renderer2, @Inject('BASE_URL') private _sBaseUrl: string) { }
  ngAfterViewInit(): void {
    this._bViewLoaded = true;

    // set initial colour here
    this.colourPicker_OnChange();
  }

  ngOnInit() {

  }

  public colourPickerBrightness_OnChange() {
    let sRgbColourRaw: string;

    if (this._bChangingColour === false) {

      this._bChangingBrightness = true;

      this.setColourPreview();

      this._renderer.setStyle(this._viewChildColourPreviewBox.nativeElement, "background-color", sRgbColourRaw, RendererStyleFlags2.DashCase);

      this._bChangingBrightness = false;
    }
  }

  public colourPicker_OnChange() {

    if (this._bChangingBrightness === false) {

      this._bChangingColour = true;

      this.setColourPreview();

      this._bChangingColour = false;
    }
  }

  private setColourPreview() {
    let sRgbColour: string;

    let iColourRed: number;
    let iColourGreen: number;
    let iColourBlue: number;

    iColourRed = Math.floor(this.colourValueRed * this.colourValueBrightness);
    iColourGreen = Math.floor(this.colourValueGreen * this.colourValueBrightness);
    iColourBlue = Math.floor(this.colourValueBlue * this.colourValueBrightness);

    // create RGB value for colour. Set public to display on view
    sRgbColour = "rgb(" + iColourRed + ", " + iColourGreen + ", " + iColourBlue + ")";

    this._renderer.setStyle(this._viewChildColourPreviewBox.nativeElement, "background-color", sRgbColour, RendererStyleFlags2.DashCase);

  }

  public checkUseDeviceResolution_Checked(event: any) {
    this.bUseScreenResolution = event.target.checked;
  }

  public buttonSaveWallpaper_Click() {
    let sDownloadUrl: string;
    let iColourRed: number;
    let iColourGreen: number;
    let iColourBlue: number;

    let iWidth: number;
    let iHeight: number

    let asResolutionSplit: string[];

    iColourRed = Math.floor(this.colourValueRed * this.colourValueBrightness);
    iColourGreen = Math.floor(this.colourValueGreen * this.colourValueBrightness);
    iColourBlue = Math.floor(this.colourValueBlue * this.colourValueBrightness);

    if (this.bUseScreenResolution) {
      asResolutionSplit = this.getScreenResolution().split("x");
    }
    else {
      asResolutionSplit = this.resolutions[this.iSelectedResolutionId].split("x");
    }

    iWidth = +asResolutionSplit[0];
    iHeight = +asResolutionSplit[1];

    sDownloadUrl = this._sBaseUrl + `api/Image/${iColourRed}/${iColourGreen}/${iColourBlue}/${iWidth}/${iHeight}/`;

    window.open(sDownloadUrl, "_blank");
  }

  public getScreenResolution(): string {
    return window.innerWidth + "x" + window.innerHeight;
  }
}
