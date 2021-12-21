import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  BarcodeFormats,
  DetectionEvent,
  DetectionType,
  MLKitView,
} from "@nativescript/mlkit-core";
import { EventData } from "@nativescript/core";
@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  private _barcodeScannerRunning = true;
  public _detectionType: DetectionType = DetectionType.Barcode;
  public _barcode: string;
  public _pause = true;
  public _torchEnabled = true;

  public _barcodeFormats: BarcodeFormats[];

  @ViewChild("idScanner", { read: ElementRef, static: true })
  _scanner: ElementRef;

  //////////////////////////////////////////////////////////////////////
  constructor() {}
  //////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this._barcodeFormats = [
      BarcodeFormats.EAN_13,
      BarcodeFormats.EAN_8,
      BarcodeFormats.UPC_A,
      BarcodeFormats.UPC_E,
    ];
  }
  //////////////////////////////////////////////////////////////////////
  public onDetection(args: DetectionEvent) {
    console.log("On Detection is currently never called");
    if (args.type === DetectionType.Barcode) {
      const barcode = args.data;
      this._barcode = JSON.stringify(barcode);
      console.log("Barcode = " + this._barcode);
    }
  }
  //////////////////////////////////////////////////////////////////////
  public onTapTorch(args: EventData) {
    this._torchEnabled = !this._torchEnabled;
    /*
    if (this._scanner) {
      const scanner = this._scanner.nativeElement as MLKitView;
      this._torchEnabled = !this._torchEnabled;
      scanner.torchOn = this._torchEnabled;
    }
    */
  }
  //////////////////////////////////////////////////////////////////////
  public onTapPause(args: EventData) {
    this._pause = !this._pause;
    /*
    if (this._scanner) {
      const scanner = this._scanner.nativeElement as MLKitView;
      if (this._barcodeScannerRunning) {
        scanner.stopPreview();
      } else {
        scanner.startPreview();
      }
      this._barcodeScannerRunning = !this._barcodeScannerRunning;
    }
    */
  }
  //////////////////////////////////////////////////////////////////////
  public onMLKitViewLoaded(args: any) {
    if (global.isAndroid) {
      const scanner = args.object as MLKitView;
      if (!scanner.hasCameraPermission()) {
        scanner.requestCameraPermission();
      }
    }
  }
}
